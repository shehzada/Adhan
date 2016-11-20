
//
// Math tests
//

QUnit.test("Angle Conversion", function(assert) {
	assert.equal(radiansToDegrees(Math.PI), 180);
	assert.equal(degreesToRadians(180), Math.PI);
	assert.equal(radiansToDegrees(Math.PI/2), 90);
	assert.equal(degreesToRadians(90), Math.PI/2);
});

QUnit.test("Normalizing", function(assert) {
	assert.equal(normalizeWithBound(2.0, -5), -3);
	assert.equal(normalizeWithBound(-4, -5), -4);
	assert.equal(normalizeWithBound(-6, -5), -1);

	assert.equal(normalizeWithBound(-1, 24), 23);
	assert.equal(normalizeWithBound(1, 24), 1);
	assert.equal(normalizeWithBound(49.0, 24), 1);

	assert.equal(normalizeWithBound(361, 360), 1);
	assert.equal(normalizeWithBound(360, 360), 0);
	assert.equal(normalizeWithBound(259, 360), 259);
	assert.equal(normalizeWithBound(2592.0, 360), 72);

	assert.equal((-45).unwindAngle(), 315);
	assert.equal((361.0).unwindAngle(), 1);
	assert.equal((360).unwindAngle(), 0);
	assert.equal((259.0).unwindAngle(), 259);
	assert.equal((2592).unwindAngle(), 72);

	QUnit.close(normalizeWithBound(360.1, 360), 0.1, 0.01);
});

QUnit.test("Closest Angle", function(assert) {
    assert.equal((360.0).closestAngle(), 0);
    assert.equal((361.0).closestAngle(), 1);
    assert.equal((1.0).closestAngle(), 1);
    assert.equal((-1.0).closestAngle(), -1);
    assert.equal((-181.0).closestAngle(), 179);
    assert.equal((180.0).closestAngle(), 180);
    assert.equal((359.0).closestAngle(), -1);
    assert.equal((-359.0).closestAngle(), 1);
    assert.equal((1261.0).closestAngle(), -179);
    QUnit.close((-360.1).closestAngle(), -0.1, 0.01);
});

QUnit.test("Time Components", function(assert) {
    var comps1 = (15.199).timeComponents()
    assert.equal(comps1.hours, 15);
    assert.equal(comps1.minutes, 11);
    assert.equal(comps1.seconds, 56);

    var comps2 = (1.0084).timeComponents();
    assert.equal(comps2.hours, 1);
    assert.equal(comps2.minutes, 0);
    assert.equal(comps2.seconds, 30);

    var comps3 = (1.0083).timeComponents();
    assert.equal(comps3.hours, 1);
    assert.equal(comps3.minutes, 0);

    var comps4 = (2.1).timeComponents();
    assert.equal(comps4.hours, 2);
    assert.equal(comps4.minutes, 6);

    var comps5 = (3.5).timeComponents();
    assert.equal(comps5.hours, 3);
    assert.equal(comps5.minutes, 30);
});

QUnit.test("Minute Rounding", function(assert) {
	var date1 = new Date(2015, 0, 1, 10, 2, 29).roundedMinute();
	assert.equal(date1.getMinutes(), 2);
	assert.equal(date1.getSeconds(), 0);

	var date2 = new Date(2015, 0, 1, 10, 2, 31).roundedMinute();
	assert.equal(date2.getMinutes(), 3);
	assert.equal(date2.getSeconds(), 0);
});
