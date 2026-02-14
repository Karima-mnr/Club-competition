// app/api/register/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { sendRegistrationConfirmation } from '@/utils/sendEmail';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get form data from request
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'matricule', 'level', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if student already exists with same email or matricule
    const existingStudent = await Student.findOne({
      $or: [
        { email: body.email },
        { matricule: body.matricule }
      ]
    });

    if (existingStudent) {
      if (existingStudent.email === body.email) {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 400 }
        );
      }
      if (existingStudent.matricule === body.matricule) {
        return NextResponse.json(
          { error: 'This matricule is already registered' },
          { status: 400 }
        );
      }
    }

    // Create new student document
    const student = new Student({
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      matricule: body.matricule,
      level: body.level,
      category: body.category,
      specialization: body.specialization || null,
      github: body.github || null,
      registeredAt: new Date(),
      status: 'pending'  // ← CHANGED FROM 'registered' TO 'pending'
    });

    // Save to database
    await student.save();

    // Send confirmation email
    try {
      await sendRegistrationConfirmation({
        email: student.email,
        fullName: student.fullName,
        category: student.category,
        level: student.level
      });
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
      // Don't fail registration if email fails
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful! Check your email for confirmation.',
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        category: student.category
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { error: `This ${field} is already registered` },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      status: 'ok',
      message: 'Registration API is running',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  }
}