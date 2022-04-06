import _O, { ChainableObject } from "./index"

const obj: { [key: string | number]: any } = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4,
      g: 5
    }
  }
}

test("demo", () => {
  const demoObj = {
    a: 1,
    b: 2,
    c: 3
  }

  const mapped = _O(demoObj)
    .mapValues(v => v * 2) // { a: 2, b: 4, c: 6 }
    // @ts-ignore
    .mapKeys(k => k.toUpperCase()) // { A: 2, B: 4, C: 6 }
    // @ts-ignore
    .map((key, val) => [key + key, val + 10]) // { AA: 12, BB: 14, CC: 16 }
    .val()

  const expected = { AA: 12, BB: 14, CC: 16 }
  expect(mapped).toEqual(expected)
})

test("chainable methods", () => {
  const mapped = _O(obj)
    .mapValues((val, key) => {
      const keyStr = key as string
      return Number.isInteger(val) ? keyStr + val : { ...val, h: 6 }
    })
    .mapKeys((key, val) => {
      const keyStr = key as string
      return keyStr + (typeof val === "string" ? val : val.h)
    })
    .map((key, val) => {
      const keyStr = key as string
      return [
        keyStr + keyStr,
        typeof val === "string" ? val + val : { ...val, h: val.h * val.h }
      ]
    })
    .val()

  const expected = {
    aa1aa1: "a1a1",
    bb2bb2: "b2b2",
    c6c6: {
      d: 3,
      e: {
        f: 4,
        g: 5
      },
      h: 36
    }
  }

  expect(mapped).toEqual(expected)
})

test("map", () => {
  const mapped = _O(obj)
    .map((key, val) => {
      const keyStr = key as string
      return [keyStr + keyStr, val + val]
    })
    .val()

  const expected = {
    aa: 2,
    bb: 4,
    cc: "[object Object][object Object]"
  }

  expect(mapped).toEqual(expected)
})

test("forEach", () => {
  const newObj: { [key: string]: any } = {}
  const newArr: any[] = []
  _O(obj).forEach((val, key) => {
    const keyStr = key as string
    newObj[keyStr] = val
    newArr.push(val)
  })

  expect(newObj).toEqual(obj)
  expect(newArr).toEqual([
    1,
    2,
    {
      d: 3,
      e: {
        f: 4,
        g: 5
      }
    }
  ])
})

test("mapValues", () => {
  const mapped = _O(obj)
    .mapValues((val, key) => {
      const keyStr = key as string
      return keyStr + val
    })
    .val()

  const expected = {
    a: "a1",
    b: "b2",
    c: "c[object Object]"
  }

  expect(mapped).toEqual(expected)
})

test("mapKeys", () => {
  const mapped = _O(obj)
    .mapKeys((key, val) => {
      const keyStr = key as string
      return keyStr + val
    })
    .val()

  const expected = {
    a1: 1,
    b2: 2,
    "c[object Object]": {
      d: 3,
      e: {
        f: 4,
        g: 5
      }
    }
  }

  expect(mapped).toEqual(expected)
})

test("concat", () => {
  const mapped = _O(obj).concat({ a: 2 }, { a: 6 }, { c: 7, h: 8 }).val()

  const expected = {
    a: 6,
    b: 2,
    c: 7,
    h: 8
  }

  expect(mapped).toEqual(expected)

  const expected2 = { a: 1, b: 2 }
  expect(_O({}).concat(expected2).val()).toEqual(expected2)
})

test("filter", () => {
  const mapped = _O(obj)
    .filter((val, key) => {
      return key === "a" || val?.e?.g === 5
    })
    .val()

  const expected = {
    a: 1,
    c: {
      d: 3,
      e: {
        f: 4,
        g: 5
      }
    }
  }

  expect(mapped).toEqual(expected)
})

test("remove", () => {
  const mapped = _O(obj)
    .remove((val, key) => {
      return key === "a" || val?.e?.g === 5
    })
    .val()

  const expected = {
    b: 2
  }

  expect(mapped).toEqual(expected)
})
