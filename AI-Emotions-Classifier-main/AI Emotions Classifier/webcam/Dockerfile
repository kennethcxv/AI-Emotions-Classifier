# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code into the container
COPY . .


# Expose port 3000 for the Next.js frontend
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "dev"]
