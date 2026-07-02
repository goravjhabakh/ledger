const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const parseMoney = (input: string): number => {
  const trimmed = input.trim()
  if (!trimmed) {
    throw new Error("Amount is required")
  }

  const normalized = trimmed.replace(/,/g, "")
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("Invalid money amount.")
  }

  const value = Number(normalized)
  if (!Number.isFinite(value)) {
    throw new Error("Invalid money amount.")
  }

  return Math.round(value * 100)
}

export const formatMoney = (minor: number): string => {
  if (!Number.isInteger(minor)) {
    throw new Error("Money must be an integer in minor units.")
  }

  return formatter.format(minor / 100)
}
