import { parseCurrency } from "../currency"

describe('currency', () => {
    describe('parseCurrency', () => {
        it('should return local price', () => {
            const actual = 65;
            const expected = "$\xa065,00"

            expect(parseCurrency(actual)).toEqual(expected)
        })
    })
})