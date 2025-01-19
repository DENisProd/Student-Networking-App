interface IResponse<T> {
    success: boolean;
    message?: string;
    data?: T
}

export default IResponse;