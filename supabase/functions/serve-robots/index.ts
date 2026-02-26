import { createClient } from 'jsr:@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

Deno.serve(async (req) => {
  const url = new URL(req.url)
  const isSitemap = url.pathname.endsWith('/sitemap.xml')
  
  try {
    const { data, error } = await supabase
      .from('seo_config')
      .select('path')
      .eq('is_crawled', true)

    if (error) throw error

    const host = req.headers.get('host') || 'tribe6.app'
    const protocol = req.headers.get('x-forwarded-proto') || 'https'
    const baseUrl = `${protocol}://${host}`

    if (isSitemap) {
      // Generate Sitemap XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
      
      // Default home
      xml += `  <url><loc>${baseUrl}/</loc><priority>1.0</priority></url>\n`
      
      if (data) {
        data.forEach(route => {
          // Avoid duplicating /
          if (route.path !== '/') {
            xml += `  <url><loc>${baseUrl}${route.path}</loc><priority>0.8</priority></url>\n`
          }
        })
      }
      
      xml += `</urlset>`
      
      return new Response(xml, {
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        status: 200,
      })
    } else {
      // Generate Robots.txt
      let robotsTxt = `User-agent: *\nDisallow: /admin/\nDisallow: /profile/\nDisallow: /knowledge/\nDisallow: /changelog/\n\n`
      
      if (data) {
        data.forEach(route => {
          robotsTxt += `Allow: ${route.path}\n`
        })
      }
      
      robotsTxt += `\nSitemap: ${baseUrl}/sitemap.xml`

      return new Response(robotsTxt, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        status: 200,
      })
    }
    
  } catch (err) {
    console.error('SEO Error:', err)
    return new Response(isSitemap ? 'Error generating sitemap' : 'User-agent: *\nDisallow: /', {
      headers: { 'Content-Type': isSitemap ? 'text/plain' : 'text/plain; charset=utf-8' },
      status: isSitemap ? 500 : 200,
    })
  }
})
