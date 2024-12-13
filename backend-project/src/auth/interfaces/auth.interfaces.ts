/**
 * Represents a `user` that's passed around the API for validation purposes
 */
export interface ValidatedUser {
  id: number;
  name: string;
  email: string;
}
//@@ This was my attempt at keeping things 'type-safe' since the validated user doesn't carry the password