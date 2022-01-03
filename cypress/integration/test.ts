describe('Coalesce', () => {
	it('Front page can be opened', () => {
		cy.visit('http://localhost:3001');

		cy.contains('Post bubble');
	});

	it('A bubble can be posted', () => {
		cy.get('input[name=poster]').type('Test Poster');
		cy.get('input[name=title]').type('Test Title Goes Here!');
		cy.get('textarea[name=content]').type('Lorem Ipsum Dolor');
		cy.get('button').click();

		cy.contains('Test Title Goes Here!');
	});
});