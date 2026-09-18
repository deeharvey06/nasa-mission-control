describe('Mission control', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/planets', [
      { kepid: 442, kepler_name: 'Kepler-442 b' },
    ]).as('planets');
    cy.intercept('GET', '**/api/launches', []).as('launches');
  });

  it('schedules, aborts, and archives a mission with the real Arwes provider', () => {
    const mission = {
      flightNumber: 101,
      mission: 'Explorer',
      rocket: 'Falcon',
      target: 'Kepler-442 b',
      launchDate: '2030-12-27',
      upcoming: true,
    };
    cy.intercept('POST', '**/api/launches', {
      statusCode: 201,
      body: mission,
    }).as('create');
    cy.intercept('DELETE', '**/api/launches/101', {
      ...mission,
      upcoming: false,
    }).as('abort');
    cy.visit('/');
    cy.wait(['@planets', '@launches']);
    cy.location('pathname').should('equal', '/launch');
    cy.get('[name=mission-name]').type('Explorer');
    cy.get('[name=rocket-name]').type('Falcon');
    cy.get('[name=launch-day]').type('2030-12-27');
    cy.contains('button', 'SCHEDULE MISSION').click();
    cy.wait('@create')
      .its('request.body')
      .should('include', { mission: 'Explorer', target: 'Kepler-442 b' });
    cy.contains('[role=status]', 'Mission scheduled successfully').should(
      'be.visible',
    );
    cy.contains('a', 'Mission Queue').click();
    cy.contains('button', 'Abort').click();
    cy.contains('button', 'Abort Mission').click();
    cy.wait('@abort');
    cy.contains('No missions in queue').should('be.visible');
    cy.contains('a', 'Archive').click();
    cy.contains('td', 'Explorer').should('be.visible');
  });

  it('shows errors and permits retry after a failed submission', () => {
    cy.intercept('POST', '**/api/launches', {
      statusCode: 503,
      body: { error: 'Launch service unavailable' },
    });
    cy.visit('/launch');
    cy.wait('@planets');
    cy.get('[name=mission-name]').type('Explorer');
    cy.get('[name=rocket-name]').type('Falcon');
    cy.contains('button', 'SCHEDULE MISSION').click();
    cy.get('[role=alert]').should('contain', 'Launch service unavailable');
    cy.contains('button', 'SCHEDULE MISSION').should('be.enabled');
  });

  it('loads the retained sound files and plays Arwes navigation audio', () => {
    cy.intercept('GET', '**/sound/click.mp3').as('clickSound');
    cy.visit('/launch', {
      onBeforeLoad(window) {
        cy.spy(window.AudioBufferSourceNode.prototype, 'start').as(
          'audioStart',
        );
      },
    });
    cy.wait('@clickSound')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);
    cy.wait('@planets');
    cy.contains('a', 'Mission Queue').click();
    cy.get('@audioStart').should('have.been.called');
  });

  it('supports direct routes and the mobile mission form', () => {
    cy.viewport('iphone-x');
    cy.visit('/history');
    cy.contains('h1', 'Mission history').should('be.visible');
    cy.contains('a', 'SCHEDULE MISSION').click();
    cy.get('[name=mission-name]').should('be.visible');
    cy.document().then((document) => {
      expect(document.documentElement.scrollWidth).to.be.at.most(375);
    });
  });
});
