class ChainableObject<TKey extends PropertyKey, TValue extends any> {
  private readonly _object: Record<TKey, TValue>

  constructor(obj: Record<TKey, TValue>) {
    this._object = { ...obj }
  }

  log = () => {
    console.log(this._object)
    return this
  }

  map = (cb: (key: TKey, val: TValue) => [key: TKey, val: TValue]) => {
    this.forEach((val: TValue, key: TKey) => {
      const [newKey = key, newVal = val] = cb(key, val)
      if (newKey !== key) {
        delete Object.assign(this._object, {
          [newKey]: newVal
        })[key]
      } else if (newVal !== val) {
        this._object[key] = newVal
      }
    })
    return this
  }

  forEach = (cb: (val: TValue, key: TKey) => void) => {
    Object.entries(this._object).forEach(([key, val]) =>
      cb(val as TValue, key as TKey)
    )
  }

  mapValues = (cb: (val: TValue, key: TKey) => TValue) => {
    this.forEach((val, key) => (this._object[key] = cb(val, key)))
    return this
  }

  mapKeys = (cb: (key: TKey, val: TValue) => TKey) => {
    this.forEach((val, key) => {
      const newKey = cb(key, val) || key
      if (newKey !== key) {
        delete Object.assign(this._object, {
          [newKey]: val
        })[key]
      }
    })
    return this
  }

  val = () => {
    return this._object
  }

  values = () => {
    return Object.values(this._object)
  }

  keys = () => {
    return Object.keys(this._object)
  }

  concat = (...objects: Object[]) => {
    objects.forEach(obj => {
      Object.assign(this._object, obj)
    })

    return this
  }

  filter = (cb: (val: TValue, key: TKey) => boolean) => {
    this.forEach((val, key) => {
      if (!cb(val, key)) {
        delete this._object[key]
      }
    })
    return this
  }

  remove = (cb: (val: TValue, key: TKey) => boolean) => {
    this.forEach((val, key) => {
      if (cb(val, key)) {
        delete this._object[key]
      }
    })
    return this
  }
}

const _O = <TKey extends PropertyKey, TValue extends any>(
  obj: Record<TKey, TValue>
) => new ChainableObject<TKey, TValue>(obj)

export { ChainableObject }

export default _O
