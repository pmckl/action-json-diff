const core = require('@actions/core');
const github = require('@actions/github');
const diff = require("./diff")



async function run() {
  try {
    const github_token = core.getInput('github_token');
    const context = github.context;
    const pull_request_number = context.payload.pull_request.number;
    const octokit = new github.GitHub(github_token);
    const owner = context.payload.sender.login
    const repo = context.payload.repository.name
    if (context.payload.pull_request == null) {
        core.warning('This action ment to be used on pull requests, but not found in the context!');
        return;
    }
    const string_a = core.getInput('string_a');
    const string_b = core.getInput('string_b');
    const result = await diff(string_a,string_b);
    if(result.length > 0){
        var message = result
    }
    else{
        var message = "No diff found"
    }
    octokit.issues.createComment({
        owner,
        repo: repo,
        issue_number: pull_request_number,
        message
      })
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();