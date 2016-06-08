# makefile, tbmg/

SRC=src
BUILD=build
JQUERY_SRC="https://code.jquery.com/jquery-2.2.4.min.js"


target: $(BUILD) node_modules $(BUILD)/jquery-2.js $(BUILD)/main.css $(BUILD)/main.js $(BUILD)/tbmg.html
.PHONY: target


$(BUILD)/tbmg.html: $(SRC)/tbmg.html
	cp $(SRC)/tbmg.html $(BUILD)/tbmg.html

$(BUILD):
	mkdir $(BUILD)

node_modules:
	npm install

$(BUILD)/jquery-2.js:
	wget $(JQUERY_SRC) -O $(BUILD)/jquery-2.js

$(BUILD)/main.css: $(SRC)/less/*.less
	`npm bin`/lessc $(SRC)/less/main.less $(BUILD)/main.css

$(BUILD)/main.js: $(SRC)/js/*.js
	`npm bin`/browserify $(SRC)/js/main.js -o $(BUILD)/main.js


# end makefile


