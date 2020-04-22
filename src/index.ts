import crypto from 'crypto'
import * as core from '@actions/core'
import { context } from '@actions/github'

async function main() {
  if (context.payload.action !== 'labeled') {
    core.setOutput('hasLabel', 'false')
    return
  }

  const { label } = context.payload as Payload

  if (!label || typeof label.name !== 'string' || !label.name.startsWith('env:')) {
    core.setOutput('hasLabel', 'false')
    return
  }

  const name = crypto.randomBytes(8).toString('hex')
  const [, env] = label.name.split(':')

  core.setOutput('hasLabel', 'true')
  core.setOutput('name', name)
  core.setOutput('env', env)
}

try {
  main()
} catch (error) {
  core.error(error)
  core.setFailed(error.message)
}
