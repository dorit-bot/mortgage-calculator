# Israeli mortgage calculator

[![CI](https://github.com/dorit-bot/mortgage-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/dorit-bot/mortgage-calculator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

A TypeScript engine for Israeli mortgage scenarios, published so anyone can review the formulas
and assumptions.

## How it works

- A mortgage is split into tracks, each with its own rate, share, term, and CPI linkage.
- Repayment uses Spitzer (equal real payments) or equal principal. Annual interest is divided
  by 12; CPI compounds as `(1 + annualCpi) ** (month / 12)`.
- CPI-linked schedules scale their real payments and balances by that index. Totals are
  reported nominally and in today's shekels using the same CPI path for every track.
- Variable tracks retain their opening rate throughout the baseline schedule. Sensitivity
  scenarios apply rate shocks from the first month, including to five-year variable tracks.
- Buyer-type loan-to-value, fixed-share, income, and term checks return notices. They do not
  determine bank approval or prevent a scenario from being calculated.
- Insurance is returned separately; scheduled payments and loan totals exclude it.
- The model excludes early repayment fees, refinancing, and individual bank pricing.

All amounts are shekels and rates are decimal fractions (`0.05` means 5%). This is a scenario
model, not a bank offer or financial advice.

## Data sources

The default rates come from the Bank of Israel's average new-mortgage rates by track and its
policy rate; the default inflation assumption comes from the Central Bureau of Statistics' annual
CPI change. `src/calculatorMarketData.json` is a snapshot of these sources with each one's
observation date. Run `npm run refresh:data` to fetch and validate them yourself; a refresh that
fails validation leaves the snapshot unchanged.

Mortgage averages are published as effective annual rates and converted to nominal annual rates.
The prime discount is inferred using the reporting month's closing policy rate. Variable-rate
averages cover different reset periods. These are starting points, not individual bank offers.
Observed inflation is an editable assumption for future years, not a forecast. Lending limits
are constants in the source, not live data.

## Explore the code

Read the [calculation](./src/mortgage.ts), its [tests](./src/mortgage.test.ts), or a
[worked example](./examples/basic.mjs). To run the example with Node.js 24 or newer:

```sh
npm ci
npm run example
```

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how changes
reach this repository.

## License

[MIT](./LICENSE).
