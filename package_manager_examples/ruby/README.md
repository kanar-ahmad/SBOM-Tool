

##Ruby component-scanning requirements
#

this software supports Ruby source codes based on RubyGems.

| tool    | repository scanning                      | CI/CD scanning            |
| ------- |:-----------------------------------------| :-------------------------|
| bundler | `Gemfile`, `Gemfile.lock` or `*.gemspec` | `Gemfile`, `Gemfile.lock` |
| gem     | `Gemfile`                                | `Gemfile.lock`            |
