
export const verifyCors = ({origin, cors}: {
		origin: string
		cors: {
			allowed: RegExp
			forbidden: RegExp
		}
	}): boolean => !origin || (

	cors.allowed.test(origin) && (cors.forbidden
		? !cors.forbidden.test(origin)
		: true
	)
)
