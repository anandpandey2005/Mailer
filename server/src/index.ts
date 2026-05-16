import env from 'dotenv'
env.config();
import app from './app'

const PORT = process.env.PORT || 2026;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});