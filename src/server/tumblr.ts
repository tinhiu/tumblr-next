import urlcat from 'urlcat';
export const LIMIT = '50';
export const METHOD = 'posts';
export const TYPE = 'photo';
export type TumblrParams = Record<string, string>;

export class Tumblr {
	private readonly apiKey: string;

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	async getBlogPosts(
		blogName: string,
		method: string,
		type: string,
		limit: string
	): Promise<TumblrBlog> {
		return this.req<TumblrBlog>('get', {
			blogName,
			method,
			type,
			limit,
		}).then((res) => {
			return res;
		});
	}
	async getNextPosts(
		blogName: string,
		method: string,
		type: string,
		tumblelog: string,
		page_number: string,
		limit: string
	): Promise<TumblrBlog> {
		return this.req<TumblrBlog>('get', {
			blogName,
			method,
			type,
			tumblelog,
			page_number,
			limit,
		}).then((res) => {
			return res;
		});
	}
	protected async req<T>(method: string, params: TumblrParams) {
		const url = urlcat('https://api.tumblr.com/v2/blog/:blogName/:method', {
			blogName: params.blogName,
			method: params.method,
			...params,
			api_key: this.apiKey,
		});

		const request = await fetch(url);
		const response = (await request.json()).response as T;
		if (request.status >= 400) {
			throw new Error(`Tumblr API error failed with status ${request.status}`);
		}

		return response;
	}
}
export type Blog = {
	name: string;
	posts: number;
	avatar: {
		width: number;
		height: number;
		url: string;
	}[];
	description: string;
	theme: {
		header_full_width: number;
		header_full_height: number;
		header_focus_width: number;
		header_focus_height: number;
		avatar_shape: string;
		background_color: string;
		body_font: string;
		header_bounds: string;
		header_image: string;
		header_image_focused: string;
		header_image_poster: string;
		header_image_scaled: string;
		header_stretch: boolean;
		link_color: string;
		show_avatar: boolean;
		show_description: boolean;
		show_header_image: boolean;
		show_title: boolean;
		title_color: string;
		title_font: string;
		title_font_weight: string;
	};
	title: string;
	total_posts: number;
	updated: number;
	url: string;
	uuid: string;
};
export type TumblrPostPhoto = {
	caption: string;
	original_size: {
		url: string;
		width: number;
		height: number;
	};
	alt_sizes: {
		url: string;
		width: number;
		height: number;
	}[];
};
export type TumblrPost = {
	author_blog: {
		can_show_badges: boolean;
		description: string;
		name: string;
		title: string;
		updated: number;
		url: string;
		uuid: string;
	};
	type: string;
	blog_name: string;
	blog: {
		name: string;
		title: string;
		description: string;
		url: string;
		uuid: string;
		updated: number;
	};
	id: number;
	id_string: string;
	post_url: string;
	slug: string;
	date: string;
	timestamp: number;
	state: string;
	reblog_key: string;
	tags: string[];
	short_url: string;
	summary: string;
	caption?: string;
	post_author: string;
	note_count: number;
	photos: TumblrPostPhoto[];
	display_avatar: boolean;
	trail: {
		blog: {
			name: string;
			active: boolean;
		};
		post: {
			id: string;
		};
		content_raw: string;
		content_abstract: string;
		content: string;
	}[];
};
export type TumblrBlog = {
	blog: Blog;
	posts: TumblrPost[];
	total_posts: number;
	_links: {
		next: {
			href: string;
			method: string;
			query_params: {
				limit: string;
				type: string;
				tumblelog: string;
				page_number: string;
			};
		};
	};
};
