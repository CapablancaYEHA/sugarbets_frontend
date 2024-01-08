import { Component, ReactNode } from "preact/compat";
import { Box, Title, Space, Button } from "@mantine/core";

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? (
      <Box bg="white" component="main" px="xl">
        <Box
          style={{
            position: "relative",
            display: "flex",
            minWidth: 0,
            minHeight: 0,
            flexFlow: "column nowrap",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="section"
          py="lg"
        >
          <Title order={2} c="base.5">
            Произошла ошибка приложения
          </Title>
          <Space h="xl" />
          <Button
            variant="outline"
            fullWidth={false}
            style={{ width: "min-content" }}
            onClick={() => window.location.replace("/")}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Box>
    ) : (
      this.props.children
    );
  }
}
