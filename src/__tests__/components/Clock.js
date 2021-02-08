import React from "react";
import Clock from "../../components/Clock";
import ReactDOM from "react-dom";

let root;
describe('<Clock />', () => {
    describe('when given hours, minutes and seconds ', () => {
        beforeEach(() => {
            root = document.createElement("div");
            ReactDOM.render(
                <Clock hours={1} minutes={10} seconds={22} />, root
            );
        });
        it('renders properly ', () => {
            expect(root.childNodes[0].nodeName).toEqual("DIV");
            expect(root.childNodes[0].firstChild.nodeName).toEqual("P");
            expect(root.childNodes[0].firstChild.className).toMatch(/Clock/);
            expect(root.childNodes[0].firstChild.textContent).toMatch(/Pozostało/);
        });
        it('renders a div element with first child p ', () => {
            expect(root.childNodes[0].nodeName).toEqual("DIV");
            expect(root.childNodes[0].firstChild.nodeName).toEqual("P");
        });
        it('sets a Clock className for p ', () => {
            expect(root.childNodes[0].firstChild.className).toMatch(/Clock/);
        });
        it('renders text of p properly ', () => {
            expect(root.childNodes[0].firstChild.textContent).toMatch(/Pozostało/);
        });
    });
});