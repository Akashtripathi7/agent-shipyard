# Workflow for <project>

## Default depth
<Prototype | Alpha | Beta | GA>, because <one line tied to this project's risk and users>.

| Depth     | Runs                                               |
|-----------|----------------------------------------------------|
| Prototype | /develop                                           |
| Alpha     | /develop, /verify                                  |
| Beta      | /develop, /verify, tests in /develop, /review      |
| GA        | Beta, plus a second-model review, /document, /sync |

Always, at every depth: a load-bearing decision gets written down (/architect).

## Entry points
| Situation                      | Path                                                  |
|--------------------------------|-------------------------------------------------------|
| New product                    | /scope, /architect (stack), scaffold, /audit, loop    |
| Next feature                   | /scope next, /architect, /develop, /verify, /review   |
| Code I didn't write            | /audit, /scope (enrol), then the feature path         |
| Something broke                | /debug, then /develop for the fix, /verify, /review   |

## Overrides
<Changes that always get GA regardless of default, e.g. anything touching auth, money or data deletion.>
