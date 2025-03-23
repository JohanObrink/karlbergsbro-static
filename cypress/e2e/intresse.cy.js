describe('/intresse', () => {
  beforeEach(() => cy.visit('/intresse'))
  it('renders', () => {})
  const fields = {
    name: 'Rosa Ragnarsson',
    address: 'Hånger nygård',
    postal_address: '115 21 STOCKHOLM',
    email: 'rosa.ragnarsson@mailinator.com',
    phone: '08-6709459',
    occupation: 'Företagssäljare',
    year_of_birth: '1964',
    has_summer_home: 'Nej',
    motivation: 'Det vore kul',
  }
  describe('mail form', () => {
    Object.keys(fields).forEach((key) => {
      it(`fails if [${key}] is missing`, () => {
        Object.entries(fields)
          .filter(([field]) => field !== key)
          .forEach(([field, value]) => {
            cy.get(`[name="${field}"]`).clear()
            cy.get(`[name="${field}"]`).type(value)
          })
        cy.get('[type="submit"]').click()
        cy.get('input:invalid, textarea:invalid').should('have.length', 1)
      })
    })
    it('succeeds if all required fields are entered', () => {
      Object.entries(fields).forEach(([field, value]) => {
        cy.get(`[name="${field}"]`).clear()
        cy.get(`[name="${field}"]`).type(value)
      })
      cy.get('[type="submit"]').click()
    })
    it('succeeds if all fields are entered', () => {
      Object.entries(fields).forEach(([field, value]) => {
        cy.get(`[name="${field}"]`).clear()
        cy.get(`[name="${field}"]`).type(value)
      })
      cy.get('[name="number_of_kids"]').clear()
      cy.get('[name="number_of_kids"]').type(1)
      cy.get('[name="kids_years_of_birth"]').clear()
      cy.get('[name="kids_years_of_birth"]').type('2001')
      cy.get('[type="submit"]').click()
    })
  })
})
