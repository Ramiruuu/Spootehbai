import { Input } from "@/components/ui/Input";
import { render } from "@testing-library/react-native";

describe("Input", () => {
  it("renders label and current value", async () => {
    const { getByText, getByDisplayValue } = await render(
      <Input label="Email" value="demo@example.com" onChangeText={jest.fn()} />,
    );
    expect(getByText("Email")).toBeTruthy();
    expect(getByDisplayValue("demo@example.com")).toBeTruthy();
  });

  it("shows an error message when error prop is provided", async () => {
    const { getByText } = await render(
      <Input label="Password" error="Password is required" />,
    );
    expect(getByText("Password is required")).toBeTruthy();
  });
});
