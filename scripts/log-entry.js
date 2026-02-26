import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '../.env.local')

// Minimalistic .env parser
function loadEnv() {
    if (!fs.existsSync(envPath)) {
        console.error('.env.local not found at', envPath)
        process.exit(1)
    }
    const envContent = fs.readFileSync(envPath, 'utf8')
    const lines = envContent.split('\n')
    for (const line of lines) {
        const [key, value] = line.split('=')
        if (key && value) {
            process.env[key.trim()] = value.trim()
        }
    }
}

loadEnv()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or Key missing in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function logEntry() {
    const args = process.argv.slice(2)
    const entry = {
        version: '',
        title: '',
        description: '',
        functions_affected: [],
        status: 'deployed'
    }

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--version' || args[i] === '-v') entry.version = args[++i]
        if (args[i] === '--title' || args[i] === '-t') entry.title = args[++i]
        if (args[i] === '--desc' || args[i] === '-d') entry.description = args[++i]
        if (args[i] === '--affected' || args[i] === '-a') entry.functions_affected = args[++i].split(',')
        if (args[i] === '--status' || args[i] === '-s') entry.status = args[++i]
    }

    if (!entry.version || !entry.title) {
        console.log('Usage: node scripts/log-entry.js -v <version> -t <title> [-d <description>] [-a <affected,functions>] [-s <status>]')
        process.exit(1)
    }

    console.log('Logging entry:', entry)

    const { data, error } = await supabase
        .from('changelog')
        .insert([entry])
        .select()

    if (error) {
        console.error('Error inserting log:', error)
        process.exit(1)
    }

    console.log('Successfully logged:', data[0])
}

logEntry()
