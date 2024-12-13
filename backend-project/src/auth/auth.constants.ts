//@@ I wanted to make a single source of truth for ENV variable keys
export const JWT_CONSTANTS = {
  secret: 'JWT_SECRET',
  expiresIn: 'JWT_EXPIRES_IN', //!! I ended up not using this and should have just removed it
};