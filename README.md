# action-json-diff
A Github action to differentiate 2 JSON strings, and post a comment on the PR with the diff.
If you are using this action outside of a PR it will only log the diff.

---

### Inputs
- `string_a`: Compare this string
- `string_b`: With this string
- `github_token`: A github token, to get the context
- `header_text` : An optional text to print as header on the comment

### Outputs
- `result`: The result of the diff, if no diff found it will be an empty string.

### Result

<img width="931" alt="Screenshot 2022-01-29 at 22 15 47" src="https://user-images.githubusercontent.com/937778/151677787-0a1a5e50-7f36-490f-bee2-588f983c9a02.png">


### Example

```yaml
name: Pull Request differentiate JSONs
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    name: Differentiate
    steps:
      - uses: actions/checkout@v2
      - name: Read file A
        id: readfile_a
        run: echo "::set-output name=content::$(jq -c . ./file_a.json)"
      - name: Read file B
        id: readfile_b
        run: echo "::set-output name=content::$(jq -c . ./file_b.json)"
      - name: "PR Comment"
        uses: pmckl/action-json-diff@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          string_a: "${{ steps.readfile_a.outputs.content }}"
          string_b: "${{ steps.readfile_b.outputs.content }}"
          header_text: "Diff for file_a.json and file_b.json"
```

