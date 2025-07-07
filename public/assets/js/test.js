// Assume expenses is an array of objects: { name: string, amount: number }
const expenses = [
  { name: 'Alice', amount: 200 },
  { name: 'Bob', amount: 100 },
  { name: 'Carol', amount: 900 },
  { name: 'Dave', amount: 0 }
];

const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
const share = total / expenses.length;

// Calculate net balances
const balances = expenses.map(expense => ({
  name: expense.name,
  net: expense.amount - share
}));

// Separate into creditors and debtors
let creditors = balances.filter(b => b.net > 0);
let debtors = balances.filter(b => b.net < 0);

// You can sort them if needed (optional)
// Example: creditors.sort((a, b) => b.net - a.net);
// Example: debtors.sort((a, b) => a.net - b.net);

const transactions = [];

while (creditors.length && debtors.length) {
  const creditor = creditors[0];
  const debtor = debtors[0];
  const amount = Math.min(creditor.net, Math.abs(debtor.net));

  // Record the transaction: debtor pays creditor the calculated amount
  transactions.push({
    from: debtor.name,
    to: creditor.name,
    amount: amount
  });

  // Update net amounts
  creditor.net -= amount;
  debtor.net += amount;

  // Remove settled creditor or debtor
  if (Math.abs(creditor.net) < 0.01) creditors.shift();
  if (Math.abs(debtor.net) < 0.01) debtors.shift();
}

console.log(transactions);
