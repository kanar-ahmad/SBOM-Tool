

##.NET component-scanning requirements
#

this software supports .NET (C#, F#, Visual Basic, etc...) source codes based on NuGet.

| tool  | repository scanning                                              | CI/CD scanning                                                                                                   |
| ----- |:-----------------------------------------------------------------| :----------------------------------------------------------------------------------------------------------------|
| NuGet | `.csproj/.xproj`, `packages.config`, `project.json` or `.nuspec` | `.csproj/.xproj`, `packages.config`, `project.lock.json`, `obj/project.assets.json`, `project.json` or `.nuspec` |
