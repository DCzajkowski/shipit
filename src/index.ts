import * as core from '@actions/core'
import { GitHub, context } from '@actions/github'

function getPrNumber(): number {
  const pullRequest = context.payload.pull_request

  if (!pullRequest || !pullRequest.number) {
    throw 'Could not get pull request number from context, exiting'
  }

  return pullRequest.number
}

async function main() {
  const repoToken = core.getInput('repo-token', { required: true })
  const awsToken = core.getInput('aws-token', { required: true })
  const bucketName = core.getInput('bucket-name', { required: true })

  const prNumber = getPrNumber()

  // const client = new GitHub(repoToken)

  // const pr = client.pulls.get({
  //   owner:
  // })

  console.log(
    `Event for pr #${prNumber} with payload ${JSON.stringify(
      context.payload
    )}. Config passed is: repoToken: ${repoToken}, awsToken: ${awsToken}, bucketName: ${bucketName}`
  )
}

try {
  main()
} catch (error) {
  core.error(error)
  core.setFailed(error.message)
}
