import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import HomeText from "../Components/home/hometext";

Enzyme.configure({ adapter: new Adapter() });

describe("mytest", () => {
  it("Home renders HomeText Component", () => {
    const wrapper = shallow(<HomeText />);
    const mytext = wrapper.find("#intotext");
    expect(mytext.text()).toBe(
      "A Web Interface for the basicsynbio python package. Get started creating and analysing you constructs and build below"
    );
  });
});
