
/**
 * @param NotPart converts partial into non partial 
 * type
 * @example ```tsx
 * type A = { id?: string }
 * type B = NotPart<A> // { id: string }
 * ``` 
 */
type NotPart<T> = {
    [Property in keyof T]-?: T[Property]
}

/**
 * @param InversePartial converts choosen partial into non partial 
 * type
 * @example ```tsx
 * type A = { id?: string, username?: string }
 * type B = InversePartial<A, "id"> // { id: string, username?: string }
 * ``` 
 */
export type InversePartial<T, K extends keyof T> = Pick<NotPart<T>, K> & Omit<T, K>
