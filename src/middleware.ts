import { isTokenExpired } from './app/utils/isTokenExpired';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // const token = process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string;
  // const refresh = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN_KEY as string;
  // const authToken = req.cookies.get(token)?.value;
  // const refreshToken = req.cookies.get(refresh)?.value;
  // const checkLogin = req.cookies.get('checkLogin')?.value;
  // const explore = req.cookies.get('explore')?.value;
  // // 비정상 상태 : 토큰, 리프레시토큰, 비로그인 상태
  // if (!authToken || !refreshToken || !checkLogin) {
  //   if (!explore) {
  //     const res = NextResponse.redirect(new URL('/sign-in', req.url));
  //     res.cookies.delete('authToken');
  //     res.cookies.delete('refreshToken');
  //     res.cookies.set('checkLogin', 'false');
  //     return res;
  //   }
  // }
  // // AccessToken이 만료가 되었을 때 재갱신
  // if (isTokenExpired(authToken as string)) {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh/token`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           ...(refreshToken ? { Authorization: refreshToken } : {}),
  //         },
  //       }
  //     );
  //     // res값이 false인 경우 로그인 페이지로 리다이렉트
  //     if (!response.ok) {
  //       const res = NextResponse.redirect(new URL('/sign-in', req.url));
  //       res.cookies.delete(token);
  //       res.cookies.delete(refresh);
  //       res.cookies.set('checkLogin', 'false');
  //       return res;
  //     }
  //     const newTokenData = await response.json();
  //     console.log(newTokenData);
  //     const res = NextResponse.next();
  //     res.cookies.set(token, newTokenData.access_token);
  //     res.cookies.set(refresh, newTokenData.refresh_token);
  //     res.cookies.set('checkLogin', 'true');
  //     return res;
  //   } catch (error) {
  //     console.error('토큰 재갱신 실패', error);
  //     const res = NextResponse.redirect(new URL('/sign-in', req.url));
  //     res.cookies.delete(token);
  //     res.cookies.delete(refresh);
  //     res.cookies.set('checkLogin', 'false');
  //     return res;
  //   }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ['/kakaka'],
};
