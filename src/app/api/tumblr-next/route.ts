export const dynamic = 'force-dynamic';
import { Tumblr } from '@/server/tumblr';
import { getPhotoFromTextType } from '@/util/server';
if (!process.env.NEXT_PUBLIC_OAUTH_CONSUMER_KEY) {
	throw new Error('Please set NEXT_PUBLIC_OAUTH_CONSUMER_KEY');
}
const TUMBLR_API_KEY = process.env.NEXT_PUBLIC_OAUTH_CONSUMER_KEY as string;
export async function GET(req: Request) {
	try {
		const lfm = new Tumblr(TUMBLR_API_KEY);
		const url = new URL(req.url);
		var searchParams = new URLSearchParams(url.search);
		const blogName = searchParams.get('blog') as string;
		const method = searchParams.get('method') as string;
		const type = searchParams.get('type') as string;
		const tumblelog = searchParams.get('tumblelog') as string;
		const page_number = searchParams.get('page_number') as string;
		const limit = searchParams.get('limit') as string;
		const result = await lfm.getNextPosts(
			blogName,
			method,
			type,
			tumblelog,
			page_number,
			limit
		);
		await getPhotoFromTextType(result.posts);

		return Response.json({ blog: result }, { status: 200 });
	} catch (error: unknown) {
		if (typeof error === 'string') {
			return Response.json({ err: error }, { status: 404 });
		} else if (error instanceof Error) {
			// handle Error object
			return Response.json({ err: error.message }, { status: 404 });
		} else {
			// handle other types of errors
			return Response.json({ error }, { status: 404 });
		}
	}
}
