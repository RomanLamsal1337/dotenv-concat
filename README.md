# dotenv-concat

Action to read multiple .env files at once and merge their results.

## Example

Given the following files exist in your repository:
```
# dev/.env
FOO=foo
BAR=bar

# prod/.env
BAR=foobarbaz
BAZ=baz
```

Use the action to read and concatenate their contents:
```
- name: Read .env configs
  id: dotenv
  uses: romanlamsal/dotenv-concat@main
  with:
    paths: dev/.env,prod/.env
    
- name: Echo foo
  run: echo ${{ steps.dotenv.outputs.foo }}  # will echo 'foo'
  
- name: Echo bar
  run: echo ${{ steps.dotenv.outputs.bar }}  # will echo 'foobarbaz' due to the merge
  
- name: Echo baz
  run: echo ${{ steps.dotenv.outputs.baz }}  # will also echo 'baz'
```