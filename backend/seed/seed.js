import User from "../models/User.js";

export const seedUsers = async () => {
    try {
        // Admin (Campus Captain)
        const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!adminExists) {
            const admin = new User({
                name: "Admin Captain",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                department: "Administration",
                role: "campus_captain",
                isVerified: true
            });
            await admin.save();
            console.log("Admin user seeded successfully");
        }

        // Student
        const studentExists = await User.findOne({ email: process.env.STUDENT_EMAIL });
        if (!studentExists) {
            const student = new User({
                name: "Default Student",
                email: process.env.STUDENT_EMAIL,
                password: process.env.STUDENT_PASSWORD,
                department: "Computer Science",
                role: "student",
                isVerified: true
            });
            await student.save();
            console.log("Student user seeded successfully");
        }
    } catch (error) {
        console.error("Seeding error:", error);
    }
};
