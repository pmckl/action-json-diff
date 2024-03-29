const core = require('@actions/core');
const github = require('@actions/github');
const diff = require("./diff")



async function run() {
  try {
    const github_token = core.getInput('github_token');
    const context = github.context;
    const pull_request_number = context.payload.pull_request.number;
    const octokit = github.getOctokit(github_token)
    const owner = context.payload.sender.login
    const repo = context.payload.repository.name

    if (context.payload.pull_request == null) {
        core.warning('This action meant to be used on pull requests, but not found in the context!');
        return;
    }
    const string_a = core.getInput('string_a');
    const string_b = core.getInput('string_b');
    const header_text = core.getInput('header_text');
    const result = await diff(string_a,string_b);
    core.startGroup('Result of the diff:')
    core.info(result)
    core.endGroup()
    core.setOutput("result", result);
    if(result.length > 0){
        var message = result
    }
    else{
        var message = "No diff found!"
    }
    var body = "### "+header_text+"\n```diff\n"+message+"\n```"
    octokit.rest.issues.createComment({
        owner,
        repo: repo,
        issue_number: pull_request_number,
        body: body
      })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();