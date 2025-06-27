/**
 * 데이터를 폼 요소로 변환
 * @param data - 데이터
 * @returns 폼 요소
 */
function createFormWithData(data: Record<string, string>) {
  const form = document.createElement("form");
  form.style.display = "none";

  for (const [key, value] of Object.entries(data)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
  }

  return form;
}

/**
 * GET 요청 전송
 * @param href - 요청 대상 URL
 * @param data - FormData
 */
function get(href: string, data: Record<string, string>): void {
  const form = createFormWithData(data);
  form.method = "GET";
  form.action = href;

  document.body.appendChild(form);
  form.submit();
}

/**
 * POST 요청 전송
 * @param href - 요청 대상 URL
 * @param data - FormData
 */
function post(href: string, data: Record<string, string>): void {
  const form = createFormWithData(data);
  form.method = "POST";
  form.action = href;

  document.body.appendChild(form);
  form.submit();
}

export const form = {
  get,
  post,
};
