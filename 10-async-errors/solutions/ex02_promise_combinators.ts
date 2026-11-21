// Reference solution — ex02

export async function getCount(): Promise<number> {
  return 42
}

export async function getName(): Promise<string> {
  return 'Ada'
}

export async function getFlag(): Promise<boolean> {
  return true
}

export async function loadProfile(): Promise<[number, string, boolean]> {
  return Promise.all([getCount(), getName(), getFlag()])
}

export async function partition(
  promises: Array<Promise<number>>,
): Promise<{ values: number[]; errors: string[] }> {
  const settled = await Promise.allSettled(promises)
  const values: number[] = []
  const errors: string[] = []
  for (const result of settled) {
    if (result.status === 'fulfilled') {
      values.push(result.value)
    } else {
      errors.push(String(result.reason))
    }
  }
  return { values, errors }
}
