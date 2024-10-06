export const mockIntersectionObserver = () => {
  const mockObserver = jest.fn();
  mockObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  });
  window.IntersectionObserver = mockObserver;
};
