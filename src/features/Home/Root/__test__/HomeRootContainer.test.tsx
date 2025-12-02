import { screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { customRender } from "@/tests/helpers/customRender";

import { HomeRootContainer } from "../HomeRootContainer";

const recieveHomeRootContainerProps: any[] = []

vi.mock("../HomeRootPresentational", () => ({
  HomeRootPresentational: (props: any) => {
    recieveHomeRootContainerProps.push(props);
    return <div data-testid="mocked-home-root-presentational" />
  }
}))

describe("HomeRootContainer", () => {
  describe("正常系", () => {
    it("HomeRootPresentationalに正しいpropsが渡される", () => {
      customRender(<HomeRootContainer />);

      expect(screen.getByTestId("mocked-home-root-presentational")).toBeInTheDocument();
      expect(recieveHomeRootContainerProps[0]).toMatchObject({});

    })
  })
})