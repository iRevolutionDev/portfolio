use sqlx::error::DatabaseError;
use std::fmt;

#[derive(Debug)]
pub enum InfraError {
    InternalServerError,
    NotFound,
}

pub trait Error {
    fn as_infra_error(&self) -> InfraError;
}

impl fmt::Display for InfraError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            InfraError::InternalServerError => write!(f, "Internal server error"),
            InfraError::NotFound => write!(f, "Not found"),
        }
    }
}

impl Error for dyn DatabaseError {
    fn as_infra_error(&self) -> InfraError {
        InfraError::InternalServerError
    }
}