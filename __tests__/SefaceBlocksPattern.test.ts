describe('Seface Blocks › Name Patterns', () => {
  test('should be valid regex pattern for identifiers', () => {
    const regex = new RegExp('^(?:seface)+:[a-z_]{3,}$');

    expect('seface:entity').toMatch(regex);
    expect('seface:').not.toMatch(regex);
    expect('namespace:entity').not.toMatch(regex);
    expect('should fail').not.toMatch(regex);
  });

  test('should be valid regex pattern for animation controllers', () => {
    const regex = new RegExp('^(?:controller.animation.)+[a-z0-9_.]{3,}$');

    expect('controller.animation.entity').toMatch(regex);
    expect('controller.animation.').not.toMatch(regex);
    expect('animation.controller.invalid').not.toMatch(regex);
    expect('should fail').not.toMatch(regex);
  });

  test('should be valid regex pattern for animations', () => {
    const regex = new RegExp('^(?:animation.)+[a-z0-9_.]{3,}$');

    expect('animation.entity').toMatch(regex);
    expect('animation.').not.toMatch(regex);
    expect('invalid.animation').not.toMatch(regex);
    expect('should fail').not.toMatch(regex);
  });

  test('should be valid regex pattern for geometries', () => {
    const regex = new RegExp('^(?:geometry.)+[a-z_]{3,}$');

    expect('geometry.entity').toMatch(regex);
    expect('geometry.').not.toMatch(regex);
    expect('invalid.geometry').not.toMatch(regex);
    expect('should fail').not.toMatch(regex);
  });
});
