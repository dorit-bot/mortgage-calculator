import { calculateMortgage, mortgagePresetTracks, BANK_OF_ISRAEL_RATE, DEFAULT_CPI_RATE } from '../dist/index.js';

const result = calculateMortgage({
  propertyPrice: 2_500_000,
  downPayment: 750_000,
  buyerType: 'first',
  repayment: 'spitzer',
  cpiRate: DEFAULT_CPI_RATE,
  boiRate: BANK_OF_ISRAEL_RATE.value,
  tracks: mortgagePresetTracks('thirds', 25),
});

// Amounts are shekels, so whole numbers are enough for a summary.
console.log(JSON.stringify({
  loanAmount: result.loanAmount,
  firstPayment: Math.round(result.firstPayment),
  peakPayment: Math.round(result.peakPayment),
  totalNominal: Math.round(result.nominal.total),
  totalInTodaysShekels: Math.round(result.today.total),
  notices: result.notices,
}, null, 2));
