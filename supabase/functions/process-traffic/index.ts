import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    // Use SERVICE_ROLE_KEY to bypass RLS for logging and security queries
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Extract Request Info
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                  req.headers.get('cf-connecting-ip')
    
    // For localhost testing, IP comes back empty or '127.0.0.1'
    const ip = (rawIp && rawIp !== '127.0.0.1' && rawIp !== '::1') ? rawIp : '8.8.8.8'
               
    let geo_country = req.headers.get('cf-ipcountry') || null
    let geo_city = req.headers.get('cf-ipcity') || null
    
    // Fallback: If Cloudflare didn't inject them or we are testing locally, lookup via ip-api
    if (!geo_city || !geo_country) {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`)
        const geoData = await geoRes.json()
        if (geoData.status === 'success') {
          geo_city = geoData.city || geo_city
          geo_country = geoData.country || geo_country
        }
      } catch (err) {
        console.error('Failed fetching fallback geo IP', err)
      }
    }
    const userAgent = req.headers.get('user-agent') || 'unknown'
    
    // We'll parse the body for the current path
    let payload: any = {}
    try {
      const body = await req.clone().json()
      payload = body
    } catch (e) {
      console.log("No JSON body or parsing failed")
    }
    
    const path = payload.path || '/'

    // Basic heuristic for Device & Browser
    let device = 'desktop'
    if (/Mobile|Android|iP(ad|hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      device = 'mobile'
    } else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      device = 'tablet'
    }

    let browser = 'unknown'
    if (userAgent.includes('Edg')) browser = 'Edge'
    else if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browser = 'Safari'

    // 1. Check if IP is explicitly blocked in old table first
    const { data: blockedIpData } = await supabase
      .from('blocked_ips')
      .select('ip')
      .eq('ip', ip)
      .maybeSingle()

    let isBlocked = !!blockedIpData

    // 2. Check Geo-Config for explicit City or Country blocks if not already blocked
    if (!isBlocked && (geo_city || geo_country)) {
      // Look for a blocking record matching either just the country, or both country + city
      let query = supabase.from('geo_config').select('id').eq('is_blocked', true)
      
      const orConditions = []
      if (geo_country) orConditions.push(`and(country_code.eq.${geo_country},city.is.null)`)
      if (geo_country && geo_city) orConditions.push(`and(country_code.eq.${geo_country},city.eq."${geo_city}")`)
      
      if (orConditions.length > 0) {
        query = query.or(orConditions.join(','))
        const { data: geoBlockData } = await query.limit(1)
        if (geoBlockData && geoBlockData.length > 0) {
          isBlocked = true
        }
      }
    }

    // 3. Log to clicks table
    const { error: insertError } = await supabase
      .from('clicks')
      .insert({
        ip,
        geo_country,
        geo_city,
        device,
        browser,
        path,
        is_blocked: isBlocked
      })

    if (insertError) throw insertError

    // 3. Return response
    return new Response(
      JSON.stringify({ blocked: isBlocked }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )

  } catch (error) {
    console.error('Process Traffic Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})
