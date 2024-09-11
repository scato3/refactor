import queryString from 'query-string';

import { getAppCookie, setAppCookie } from './cookie';
import { FetchOptions } from '../types/fetchType';
import { isTokenExpired } from './isTokenExpired';
import { postRefreshToken } from '../apis/login/oauth';

const _fetch = async ({
  body,
  method,
  query,
  refreshToken,
  url,
  revalidate,
  tags,
}: FetchOptions) => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const baseUrl = `${apiBaseUrl}/${url}`;
  const apiUrl = query
    ? `${baseUrl}?${queryString.stringify(query, { skipNull: true, skipEmptyString: true })}`
    : baseUrl;

  const refreshTokenKey = process.env
    .NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string;
  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string;

  const token = refreshToken
    ? getAppCookie(refreshTokenKey)
    : getAppCookie(accessTokenKey);

  let headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  let requestOptions: RequestInit = {
    method,
    headers,
    cache: revalidate ? 'force-cache' : 'no-cache',
    ...(revalidate ? { next: { revalidate } } : {}),
    ...(tags ? { next: { tags } } : {}),
    ...(body && typeof body === 'object' ? { body: JSON.stringify(body) } : {}),
  };

  let res = await fetch(apiUrl, requestOptions);

  if (token && isTokenExpired(token as string)) {
    try {
      // 401 에러가 발생한 경우, 리프레시 토큰을 사용하여 새 액세스 토큰 발급
      const refreshResult = await postRefreshToken();

      // 새로운 액세스 토큰과 리프레시 토큰을 쿠키에 저장
      setAppCookie(accessTokenKey, refreshResult.accessToken);
      setAppCookie(refreshTokenKey, refreshResult.refreshToken);

      headers = {
        ...headers,
        Authorization: `Bearer ${refreshResult.accessToken}`,
      };

      // 요청을 다시 시도
      requestOptions = {
        ...requestOptions,
        headers,
      };
      res = await fetch(apiUrl, requestOptions);
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const contentType = res.headers.get('Content-Type') || '';

  if (contentType.includes('application/json')) {
    return await res.json();
  } else if (
    contentType.includes('text/plain') ||
    contentType.includes('text/html')
  ) {
    return await res.text();
  }
};

const fetchMethod = (method: string) => (options: FetchOptions) => {
  return _fetch({ method, ...options });
};

const api = {
  get: fetchMethod('GET'),
  post: fetchMethod('POST'),
  patch: fetchMethod('PATCH'),
  put: fetchMethod('PUT'),
  delete: fetchMethod('DELETE'),
};

export default api;
