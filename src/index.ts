import crypto from 'crypto'
import * as core from '@actions/core'
import { context } from '@actions/github'

async function main() {
  if (context.eventName !== 'pull_request') {
    console.log('The event does not apply to a PR. Skiping...')
    return
  }

  const labels = context.payload.pull_request!.labels
  const label = labels.find(({ name }) => name.startsWith('env:'))

  if (!label) {
    console.log('The PR does not have a `env:*` label. Skiping...')
    core.setOutput('hasLabel', 'false')
    return
  }

  const prNumber = context.payload.pull_request!.number
  const name = crypto.createHash('md5').update(String(prNumber)).digest('hex')
  const [, env] = label.name.split(':')

  core.setOutput('hasLabel', 'true')
  core.setOutput('name', name)
  core.setOutput('env', env)
  console.log('The PR was identified to have a label with env: ', env, '. The PR name is:', name)
}

try {
  main()
} catch (error) {
  core.error(error)
  core.setFailed(error.message)
}
