# Use nginx as the base image
FROM nginx:alpine

# Copy the build result to nginx's default static file location
COPY build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
