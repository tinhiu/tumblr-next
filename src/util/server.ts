import { TumblrPost } from '@/server/tumblr';

export async function getPhotoFromTextType(data: TumblrPost[]) {
	data.map((post: TumblrPost) => {
		if (post.type === 'text') {
			var m,
				photos = [],
				rex = /<img[^>]+src=\"?([^"\s]+)"?\s*\"/g;
			while (
				(m = rex.exec(
					post.trail[0].content
						? post.trail[0].content
						: post.trail[0].content_raw
				))
			) {
				photos.push({
					caption: '',
					original_size: {
						url: m[1],
						height: 1920,
						width: 1080,
					},
					alt_sizes: [],
				});
			}
			post.photos = photos;
		}
	});
}
