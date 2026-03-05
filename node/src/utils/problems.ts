export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: unknown;
}

export const createProblem = (
  status: number,
  title: string,
  detail?: string,
  instance?: string,
  errors?: unknown,
): ProblemDetails => {
  return {
    type: `https://httpstatuses.com/${status}`,
    title,
    status,
    detail,
    instance,
    errors,
  };
};
