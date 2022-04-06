class ChainableObject extends Object {
  private readonly _object: any

  constructor(obj: Object) {
    super({ ...obj })
    this._object = { ...obj }
  }

  log = () => {
    console.log(this._object)
    return this
  }

  map = (cb: (key: PropertyKey, val: any) => [key: PropertyKey, val: any]) => {
    this.forEach((val: any, key: PropertyKey) => {
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

  forEach = (cb: (val: any, key: PropertyKey) => void) => {
    Object.entries(this._object).forEach(([key, val]) => cb(val, key))
  }

  mapValues = (cb: (val: any, key: PropertyKey) => any) => {
    this.forEach((val, key) => (this._object[key] = cb(val, key)))
    return this
  }

  mapKeys = (cb: (key: PropertyKey, val: any) => string) => {
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

  concat = (...objects: Object[]) => {
    objects.forEach(obj => {
      Object.assign(this._object, obj)
    })

    return this
  }

  filter = (cb: (val: any, key: PropertyKey) => boolean) => {
    this.forEach((val, key) => {
      if (!cb(val, key)) {
        delete this._object[key]
      }
    })
    return this
  }

  remove = (cb: (val: any, key: PropertyKey) => boolean) => {
    this.forEach((val, key) => {
      if (cb(val, key)) {
        delete this._object[key]
      }
    })
    return this
  }
}

const _O = (obj: Object) => new ChainableObject(obj)

export { ChainableObject }

export default _O
