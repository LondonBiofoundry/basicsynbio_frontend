import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../Pages/Home";
import HomeText from "../Components/home/hometext";

Enzyme.configure({ adapter: new Adapter() });

describe("mytest", () => {
  it("Home renders HomeText Component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(HomeText)).toHaveLength(1);
  });
});
