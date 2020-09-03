USE StudyHub;

INSERT INTO user
value (NULL,'ljh',AES_ENCRYPT('123',SHA2('passwd',256)),'junhao','junhao.ca',TRUE,'Master','ECE',0.0);

SELECT AES_DECRYPT((SELECT password from user WHERE username = 'ljh'),SHA2('passwd',256));