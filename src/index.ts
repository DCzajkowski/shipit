import crypto from 'crypto'
import * as core from '@actions/core'
import { context } from '@actions/github'

const setOutput = (key, value) => {
  console.log(`Setting output: ${key}=${value}`)
  core.setOutput(key, value)
}

async function main() {
  if (context.payload.action !== 'labeled') {
    setOutput('hasLabel', 'false')
    return
  }

  const { label } = context.payload as Payload

  if (!label || typeof label.name !== 'string' || !label.name.startsWith('env:')) {
    setOutput('hasLabel', 'false')
    return
  }

  const name = crypto.randomBytes(8).toString('hex')
  const [, env] = label.name.split(':')

  setOutput('hasLabel', 'true')
  setOutput('name', name)
  setOutput('env_vars', env.startsWith('dev') ? 'DEVELOPMENT=true' : 'PRODUCTION=true')
}

try {
  main()
} catch (error) {
  core.error(error)
  core.setFailed(error.message)
}
